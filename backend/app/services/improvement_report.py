def generate_improvement_report(
    overall_match: float,
    verdict: str,
    strengths: list[str],
    weaknesses: list[str],
    missing_skills: list[str],
) -> str:

    report = (
        f"The resume is classified as a {verdict.lower()} "
        f"with an overall ATS match score of {overall_match}%. "
    )

    if strengths:
        report += (
            "Key strengths include "
            + ", ".join(strengths)
            + ". "
        )

    if weaknesses:
        report += (
            "Areas requiring improvement include "
            + ", ".join(weaknesses)
            + ". "
        )

    if missing_skills:
        report += (
            "The resume would benefit from demonstrating "
            + ", ".join(missing_skills)
            + " skills more effectively."
        )

    return report