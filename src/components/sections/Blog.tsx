
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of ETL: Real-Time Data Processing",
      description: "Discover how real-time ETL processes are revolutionizing data analytics and business intelligence.",
      date: "2024-05-25",
      author: "Sarah Johnson",
      readTime: "5 min read",
      category: "Data Engineering"
    },
    {
      id: 2,
      title: "Automation in Enterprise: ROI and Best Practices",
      description: "Learn how enterprise automation delivers measurable ROI and the best practices for implementation.",
      date: "2024-05-22",
      author: "Michael Chen",
      readTime: "7 min read",
      category: "Automation"
    },
    {
      id: 3,
      title: "Cloud-Native Development: A Complete Guide",
      description: "Everything you need to know about building scalable, cloud-native applications in 2024.",
      date: "2024-05-18",
      author: "Alex Rivera",
      readTime: "8 min read",
      category: "Development"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in software development, data engineering, and automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-6 line-clamp-3">
                  {post.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
