
interface ProcessHeaderProps {
  title: string;
  description: string;
}

const ProcessHeader = ({ title, description }: ProcessHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ProcessHeader;
