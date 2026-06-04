"""Render a PDF report for the Canadian financials penalized-regression run."""

from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent
DATA = ROOT / "outputs" / "financials"
CHARTS = DATA / "charts"
PDF_PATH = ROOT / "canadian_financials_penalized_regression_report_v2.pdf"

ACCENT = "#007ea7"
ACCENT_STRONG = "#003459"
TEXT = "#00171f"
MUTED = "#003459"
GRID = "#cfdde6"
BG = "#f4f7fa"
WHITE = "#ffffff"


def load_data() -> dict[str, pd.DataFrame]:
    return {
        "comparison": pd.read_csv(DATA / "financials_model_comparison.csv"),
        "forecast": pd.read_csv(DATA / "financials_best_forecast.csv", parse_dates=["date"]),
        "fold_metrics": pd.read_csv(DATA / "financials_best_fold_metrics.csv", parse_dates=["train_start", "train_end", "test_start", "test_end"]),
        "coeffs": pd.read_csv(DATA / "financials_best_coeffs.csv"),
        "strategy": pd.read_csv(DATA / "financials_strategy_table.csv", parse_dates=["date"]),
        "buckets": pd.read_csv(DATA / "financials_bucket_table.csv"),
        "feature_summary": pd.read_csv(DATA / "financials_feature_summary.csv"),
        "metadata": pd.read_csv(DATA / "financials_run_metadata.csv"),
    }


def ensure_dirs() -> None:
    CHARTS.mkdir(parents=True, exist_ok=True)


def style_axes(ax, title: str, subtitle: str | None = None, ylabel: str | None = None) -> None:
    ax.set_title(title, loc="left", fontsize=13, fontweight="bold", color=TEXT, pad=12)
    if subtitle:
        ax.text(0.0, 1.01, subtitle, transform=ax.transAxes, fontsize=9, color=MUTED, va="bottom")
    if ylabel:
        ax.set_ylabel(ylabel, color=MUTED)
    ax.tick_params(colors=MUTED)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(GRID)
    ax.spines["bottom"].set_color(GRID)
    ax.grid(axis="y", color=GRID, linewidth=0.8, alpha=0.8)
    ax.set_facecolor(WHITE)


def save_model_comparison_chart(comparison: pd.DataFrame) -> Path:
    fig, ax = plt.subplots(figsize=(9.2, 4.8), dpi=180)
    top = comparison.head(6).copy()
    labels = top["universe_name"] + " | " + top["model_name"] + " / " + top["feature_mode"]
    ax.barh(labels[::-1], top["mean_rank_ic"][::-1], color=ACCENT, alpha=0.95)
    ax.axvline(0, color=ACCENT_STRONG, linewidth=1)
    style_axes(ax, "Model comparison by mean rank IC", "Higher is better. This is the validation signal used to choose the final model.", "Mean rank IC")
    fig.tight_layout()
    path = CHARTS / "model_comparison_rank_ic.png"
    fig.savefig(path, bbox_inches="tight", facecolor=WHITE)
    plt.close(fig)
    return path


def save_cumulative_strategy_chart(strategy: pd.DataFrame) -> Path:
    fig, ax = plt.subplots(figsize=(10.5, 4.8), dpi=180)
    ax.plot(strategy["date"], strategy["model_cumulative"], color=ACCENT_STRONG, linewidth=2.1, label="Model long-short")
    ax.plot(strategy["date"], strategy["momentum_cumulative"], color=ACCENT, linewidth=1.9, label="Momentum baseline")
    ax.axhline(0, color=MUTED, linewidth=1, linestyle="--", alpha=0.8)
    style_axes(ax, "Cumulative long-short performance", "Top minus bottom names each month, compounded through time.", "Cumulative return")
    ax.legend(frameon=False, ncol=2, loc="upper left")
    fig.autofmt_xdate(rotation=30, ha="right")
    fig.tight_layout()
    path = CHARTS / "cumulative_long_short.png"
    fig.savefig(path, bbox_inches="tight", facecolor=WHITE)
    plt.close(fig)
    return path


def save_rank_ic_chart(forecast: pd.DataFrame) -> Path:
    frame = forecast.copy()
    monthly = (
        frame.groupby("date")
        .apply(lambda g: g["actual_score"].corr(g["predicted_score"], method="spearman"))
        .rename("rank_ic")
        .reset_index()
    )
    monthly["rolling_12"] = monthly["rank_ic"].rolling(12, min_periods=6).mean()

    fig, ax = plt.subplots(figsize=(10.5, 4.6), dpi=180)
    ax.bar(monthly["date"], monthly["rank_ic"], color=ACCENT, alpha=0.25, width=20)
    ax.plot(monthly["date"], monthly["rolling_12"], color=ACCENT_STRONG, linewidth=2.1)
    ax.axhline(0, color=MUTED, linewidth=1, linestyle="--", alpha=0.8)
    style_axes(ax, "Monthly rank IC with 12-month rolling average", "This shows whether the cross-sectional ranking signal is persistent or just a few good folds.", "Rank IC")
    fig.autofmt_xdate(rotation=30, ha="right")
    fig.tight_layout()
    path = CHARTS / "monthly_rank_ic.png"
    fig.savefig(path, bbox_inches="tight", facecolor=WHITE)
    plt.close(fig)
    return path


def save_bucket_chart(buckets: pd.DataFrame) -> Path:
    fig, ax = plt.subplots(figsize=(9.4, 4.8), dpi=180)
    buckets = buckets.copy()
    buckets["bucket"] = buckets["bucket"].astype(int)
    width = 0.35
    x = buckets["bucket"].to_numpy(dtype=float)
    ax.bar(x - width / 2, buckets["predicted_mean_return"], width=width, color=ACCENT_STRONG, label="Predicted-score buckets")
    ax.bar(x + width / 2, buckets["momentum_mean_return"], width=width, color=ACCENT, label="Momentum buckets")
    ax.axhline(0, color=MUTED, linewidth=1, linestyle="--", alpha=0.8)
    style_axes(ax, "Mean next-month return by ranking bucket", "Higher buckets should ideally hold the winners and lower buckets the laggards.", "Mean next-month return")
    ax.set_xlabel("Bucket (low to high predicted score)", color=MUTED)
    ax.legend(frameon=False, ncol=2, loc="upper left")
    fig.tight_layout()
    path = CHARTS / "bucket_calibration.png"
    fig.savefig(path, bbox_inches="tight", facecolor=WHITE)
    plt.close(fig)
    return path


def save_feature_chart(feature_summary: pd.DataFrame) -> Path:
    fig, ax = plt.subplots(figsize=(9.8, 5.1), dpi=180)
    top = feature_summary.head(12).copy()
    top = top.sort_values("mean_abs_coefficient")
    ax.barh(top["feature"], top["mean_abs_coefficient"], color=ACCENT, alpha=0.95)
    style_axes(ax, "Most active coefficients in the selected model", "Absolute coefficient size is a simple way to show which predictors survive the penalty.", "Mean absolute coefficient")
    fig.tight_layout()
    path = CHARTS / "top_coefficients.png"
    fig.savefig(path, bbox_inches="tight", facecolor=WHITE)
    plt.close(fig)
    return path


def df_to_table(df: pd.DataFrame, col_widths=None) -> Table:
    data = [list(df.columns)] + df.astype(str).values.tolist()
    table = Table(data, colWidths=col_widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(ACCENT_STRONG)),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 7.3),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor(BG)]),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor(GRID)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEADING", (0, 0), (-1, -1), 9),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def scaled_image(path: Path, max_width: float) -> Image:
    reader = ImageReader(str(path))
    width, height = reader.getSize()
    scale = min(max_width / width, 1.0)
    return Image(str(path), width=width * scale, height=height * scale)


def build_pdf() -> Path:
    ensure_dirs()
    data = load_data()

    comparison = data["comparison"].copy()
    forecast = data["forecast"].copy()
    fold_metrics = data["fold_metrics"].copy()
    coeffs = data["coeffs"].copy()
    strategy = data["strategy"].copy()
    buckets = data["buckets"].copy()
    feature_summary = data["feature_summary"].copy()
    metadata = data["metadata"].copy()

    chart_paths = [
        save_model_comparison_chart(comparison),
        save_cumulative_strategy_chart(strategy),
        save_rank_ic_chart(forecast),
        save_bucket_chart(buckets),
        save_feature_chart(feature_summary),
    ]

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.6 * inch,
        bottomMargin=0.55 * inch,
    )

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleAccent",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=25,
            textColor=colors.HexColor(TEXT),
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyAccent",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor(MUTED),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionAccent",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.5,
            leading=16,
            textColor=colors.HexColor(TEXT),
            spaceBefore=10,
            spaceAfter=8,
        )
    )

    best = comparison.iloc[0]
    summary_metrics = pd.DataFrame(
        [
            {"Metric": "Best model", "Value": f"{best['model_name']} / {best['feature_mode']}"},
            {"Metric": "Best universe", "Value": best["universe_name"]},
            {"Metric": "Target", "Value": best["target_mode"]},
            {"Metric": "Mean rank IC", "Value": f"{best['mean_rank_ic']:.4f}"},
            {"Metric": "Mean hit rate", "Value": f"{best['mean_hit_rate']:.2%}"},
            {"Metric": "Model long-short", "Value": f"{best['mean_ls_mean']:.4f}"},
            {"Metric": "Momentum long-short", "Value": f"{best['mean_momentum_ls_mean']:.4f}"},
            {"Metric": "Forecast rows", "Value": f"{len(forecast):,}"},
            {"Metric": "Date range", "Value": f"{forecast['date'].min().date()} to {forecast['date'].max().date()}"},
            {"Metric": "Selected features", "Value": f"{int(feature_summary['selection_count'].sum()):,}"},
        ]
    )

    story = []
    story.append(Paragraph("Canadian Financials Penalized Regression", styles["TitleAccent"]))
    story.append(
        Paragraph(
            "This report focuses on a Canadian financials cross-sectional ranking problem. "
            "The model uses a long monthly history, BoC and Statistics Canada data, Canadian market context, "
            "and stock-specific momentum and volatility features to rank the next month's names.",
            styles["BodyAccent"],
        )
    )
    story.append(
        Paragraph(
            f"Data horizon: {metadata.loc[0, 'stock_start']} onward for stock and market prices, with macro inputs "
            f"lagged one month for causality. The model evaluates {len(comparison)} candidate configurations across "
            f"multiple universes and target definitions before selecting the best one by validation rank IC and long-short quality.",
            styles["BodyAccent"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(df_to_table(summary_metrics, col_widths=[2.1 * inch, 4.7 * inch]))
    story.append(Spacer(1, 0.16 * inch))

    story.append(Paragraph("How penalized regression works", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "Penalized regression is ordinary regression with an added cost for large coefficients. The penalty shrinks weak "
            "or redundant variables toward zero, and in the lasso case some coefficients are pushed all the way to zero so "
            "they drop out of the model entirely.",
            styles["BodyAccent"],
        )
    )
    story.append(
        Paragraph(
            "That matters in finance because signals are usually correlated, noisy, and fragile. A penalty makes the model "
            "favor a smaller set of variables that still explain the ranking problem out of sample. The coefficients keep "
            "their usual meaning as direction and relative strength, but now they are chosen with more discipline than plain OLS.",
            styles["BodyAccent"],
        )
    )
    story.append(
        Paragraph(
            "In this Canadian financials run, the model uses rate-sensitive macro data, stock momentum, and sector-relative "
            "context to rank next-month performance across Canadian banks. The point is not a single forecast number; it is "
            "a cleaner ranking, a readable long-short spread, and a shortlist of variables that survived the penalty.",
            styles["BodyAccent"],
        )
    )
    story.append(Paragraph("Model and strategy evidence", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "The first chart shows whether the selected model actually beats a simple momentum baseline on the long-short "
            "portfolio. The second chart checks whether the rank signal is steady month to month or just a few lucky folds.",
            styles["BodyAccent"],
        )
    )
    story.append(scaled_image(chart_paths[1], max_width=6.95 * inch))
    story.append(Spacer(1, 0.12 * inch))
    story.append(scaled_image(chart_paths[2], max_width=6.95 * inch))
    story.append(Spacer(1, 0.12 * inch))

    story.append(Paragraph("Where the signal shows up", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "The bucket chart turns the ranking problem into an intuitive test: the highest predicted buckets should hold "
            "the better forward returns, and the momentum baseline is plotted beside it for reference. If the model is useful, "
            "the top buckets should separate from the bottom buckets more cleanly than the baseline.",
            styles["BodyAccent"],
        )
    )
    story.append(scaled_image(chart_paths[3], max_width=6.95 * inch))
    story.append(Spacer(1, 0.12 * inch))

    story.append(Paragraph("Which variables survived the penalty", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "The final chart shows the predictors that stayed active most often across folds. A useful penalized model should "
            "keep the story small: a few rate, momentum, relative-strength, and sector-context variables should dominate if "
            "the signal is real.",
            styles["BodyAccent"],
        )
    )
    story.append(scaled_image(chart_paths[4], max_width=6.95 * inch))
    story.append(Spacer(1, 0.12 * inch))

    story.append(Paragraph("Model comparison", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "The table below shows every candidate configuration. This is the check that keeps us from over-selling one run: "
            "the selected model has to win against simpler penalties and narrower feature sets.",
            styles["BodyAccent"],
        )
    )
    story.append(scaled_image(chart_paths[0], max_width=6.95 * inch))
    story.append(Spacer(1, 0.12 * inch))
    comparison_view = comparison.head(5)[
        [
            "universe_name",
            "target_mode",
            "model_name",
            "feature_mode",
            "mean_rank_ic",
            "mean_hit_rate",
            "mean_ls_mean",
            "mean_momentum_ls_mean",
        ]
    ].copy()
    comparison_view = comparison_view.rename(
        columns={
            "universe_name": "universe",
            "target_mode": "target",
            "model_name": "model",
            "feature_mode": "features",
            "mean_rank_ic": "rank_ic",
            "mean_hit_rate": "hit_rate",
            "mean_ls_mean": "ls_mean",
            "mean_momentum_ls_mean": "mom_ls_mean",
        }
    )
    comparison_view["rank_ic"] = comparison_view["rank_ic"].map(lambda x: f"{x:.4f}")
    comparison_view["hit_rate"] = comparison_view["hit_rate"].map(lambda x: f"{x:.2%}")
    comparison_view["ls_mean"] = comparison_view["ls_mean"].map(lambda x: f"{x:.4f}")
    comparison_view["mom_ls_mean"] = comparison_view["mom_ls_mean"].map(lambda x: f"{x:.4f}")
    story.append(df_to_table(
        comparison_view,
        col_widths=[0.95 * inch, 0.65 * inch, 0.55 * inch, 0.75 * inch, 0.52 * inch, 0.55 * inch, 0.55 * inch, 0.68 * inch],
    ))

    story.append(PageBreak())
    story.append(Paragraph("Fold metrics", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "These are the walk-forward diagnostics for the selected configuration. The table keeps the model honest by showing "
            "how the signal behaves fold by fold rather than just in aggregate.",
            styles["BodyAccent"],
        )
    )
    fold_view = fold_metrics[[
        "fold",
        "test_start",
        "test_end",
        "alpha",
        "rank_ic",
        "hit_rate",
        "ls_mean",
        "momentum_ls_mean",
    ]].copy()
    fold_view = fold_view.rename(
        columns={
            "rank_ic": "rank_ic",
            "hit_rate": "hit_rate",
            "ls_mean": "ls_mean",
            "momentum_ls_mean": "mom_ls_mean",
        }
    )
    fold_view["test_start"] = fold_view["test_start"].dt.strftime("%Y-%m-%d")
    fold_view["test_end"] = fold_view["test_end"].dt.strftime("%Y-%m-%d")
    fold_view["alpha"] = fold_view["alpha"].map(lambda x: f"{x:.5f}")
    fold_view["rank_ic"] = fold_view["rank_ic"].map(lambda x: f"{x:.4f}")
    fold_view["hit_rate"] = fold_view["hit_rate"].map(lambda x: f"{x:.2%}")
    fold_view["ls_mean"] = fold_view["ls_mean"].map(lambda x: f"{x:.4f}")
    fold_view["mom_ls_mean"] = fold_view["mom_ls_mean"].map(lambda x: f"{x:.4f}")
    story.append(df_to_table(
        fold_view,
        col_widths=[0.38 * inch, 1.05 * inch, 1.05 * inch, 0.62 * inch, 0.58 * inch, 0.62 * inch, 0.68 * inch, 0.74 * inch],
    ))

    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph("Top coefficients", styles["SectionAccent"]))
    story.append(
        Paragraph(
            "The selected features table below shows the coefficient list from the chosen run. This is the transparency layer behind the feature-importance chart.",
            styles["BodyAccent"],
        )
    )
    story.append(df_to_table(
        feature_summary.head(15).assign(
            mean_coefficient=lambda d: d["mean_coefficient"].map(lambda x: f"{x:.5f}"),
            mean_abs_coefficient=lambda d: d["mean_abs_coefficient"].map(lambda x: f"{x:.5f}"),
            selection_count=lambda d: d["selection_count"].astype(int).astype(str),
        ),
        col_widths=[4.1 * inch, 0.9 * inch, 1.0 * inch, 0.8 * inch],
    ))

    doc.build(story)
    return PDF_PATH


if __name__ == "__main__":
    print(build_pdf())
