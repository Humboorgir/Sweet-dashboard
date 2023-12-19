const Variables = () => {
  const variables = [
    { variable: "%user%", description: "Mentions the new member" },
    { variable: "%username%", description: "New member's username" },
    { variable: "%server%", description: "Server name" },
    { variable: "%membercount%", description: "Server membercount" },
  ];

  return (
    <div className="mb-3 md:mb-0">
      <h3 className="text-gradient">Variables: </h3>
      {variables.map(({ variable, description }) => {
        return (
          <p className="text-gradient-soft">
            <span className="text-secondary">{variable}</span> {description}
          </p>
        );
      })}
    </div>
  );
};

export default Variables;
