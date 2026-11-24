
interface ExplanationCardProps {
    title: string;
    description: string;
    icon: string;
    variant: "plain" | "kid";
}

function ExplanationCard({
    title,
    description,
    icon,
    variant
}: ExplanationCardProps) {
    return (
        <section className={`explanation-card ${variant}`}>
            <div className="card-heading">
                <span className="card-icon" aria-hidden="true">
                    {icon}
                </span>

                <h3>{title}</h3>
            </div>

            <p>{description}</p>
        </section>
    );
}

export default ExplanationCard;
