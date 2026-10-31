import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Github } from "lucide-react";
import { TeamDataService, TeamMember } from "../../services/TeamDataService";
import { useMemo, useEffect, useState } from "react";

const socialIcons = {
  linkedin: { Icon: Linkedin, label: "LinkedIn" },
  twitter: { Icon: Twitter, label: "Twitter" },
  github: { Icon: Github, label: "GitHub" }
};

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

const Team = () => {
  const dataService = useMemo(() => new TeamDataService(), []);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [headerData, setHeaderData] = useState({ title: "", description: "" });

  useEffect(() => {
    Promise.all([dataService.getTeamMembers(), dataService.getHeaderData()])
      .then(([members, header]) => {
        setTeamMembers(members);
        setHeaderData(header);
      })
      .catch((error) => console.error("Failed to load team data:", error));
  }, [dataService]);

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">The troop</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{headerData.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {headerData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => {
            const links = Object.entries(socialIcons).filter(
              ([key]) =>
                (member.social[key as keyof typeof member.social] || "").startsWith("http")
            );

            return (
              <Card
                key={member.id}
                className="bg-card border-border hover:border-primary transition-colors"
              >
                <CardContent className="p-8 h-full flex flex-col text-center space-y-5">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Commander 0{index + 1}
                  </span>

                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-border"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full mx-auto border-4 border-border bg-secondary flex items-center justify-center font-mono text-3xl font-bold text-primary">
                      {initialsOf(member.name)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {links.length > 0 && (
                    <div className="flex justify-center space-x-4 pt-2">
                      {links.map(([key, { Icon, label }]) => (
                        <a
                          key={key}
                          href={member.social[key as keyof typeof member.social]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on ${label}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
