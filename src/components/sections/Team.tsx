
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Github } from "lucide-react";
import { TeamDataService } from "../../services/TeamDataService";
import { useMemo, useEffect, useState } from "react";

const Team = () => {
  const dataService = useMemo(() => new TeamDataService(), []);
  const [teamMembers, setTeamMembers] = useState([]);
  const [headerData, setHeaderData] = useState({ title: '', description: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [membersData, headerInfo] = await Promise.all([
          dataService.getTeamMembers(),
          dataService.getHeaderData()
        ]);
        setTeamMembers(membersData);
        setHeaderData(headerInfo);
      } catch (error) {
        console.error('Failed to load team data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {headerData.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {headerData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card border-border shadow-lg">
              <CardContent className="p-8 space-y-4">
                <div className="relative inline-block">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-border"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <a href={member.social.linkedin} className="text-muted-foreground hover:text-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-muted-foreground hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
