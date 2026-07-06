def generate_improvement_roadmap(
    missing_keywords,
    weaknesses,
    suggestions
):
    roadmap = []

    for keyword in missing_keywords:

        priority = "Medium"
        impact = 3

        if keyword.lower() in [
            "python",
            "fastapi",
            "postgresql",
            "docker",
            "aws"
        ]:
            priority = "High"
            impact = 8

        roadmap.append(
            {
                "priority": priority,
                "title": (
                    f"Add {keyword.title()} to Resume"
                ),
                "impact": impact
            }
        )

    return {
       "estimated_score": sum(
            item["impact"]
            for item in roadmap
        ),
        "roadmap": roadmap
    }