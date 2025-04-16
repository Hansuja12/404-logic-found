
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Activity, BrainCircuit, Share2, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eco-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4 text-center text-eco-primary">About EcoTrack</h1>
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          EcoTrack is a personal carbon footprint calculator that helps you track, understand, 
          and reduce your environmental impact through daily activities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-eco-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                EcoTrack aims to empower individuals to take climate action by providing 
                easy-to-understand data about their carbon footprint and actionable steps 
                to reduce their environmental impact. We believe that small changes by many 
                people can make a significant difference for our planet.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-eco-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                EcoTrack calculates your carbon footprint based on your daily activities in 
                transportation, food consumption, energy use, and shopping habits. We use 
                scientifically backed emission factors to provide accurate estimates of your 
                carbon dioxide equivalent emissions (CO₂e).
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-eco-primary" />
                Carbon Calculator
              </CardTitle>
              <CardDescription>Track your daily impact</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Log your activities across different categories and see the immediate carbon 
                impact of your choices. Our calculator converts your actions into 
                kilograms of CO₂ equivalent.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-eco-primary" />
                Personalized Insights
              </CardTitle>
              <CardDescription>Learn and improve</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Get customized suggestions based on your activity patterns to help you make 
                more eco-friendly choices. Our tips focus on practical changes that can have 
                a meaningful impact.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-eco-primary" />
                Visualize Impact
              </CardTitle>
              <CardDescription>See your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Track your progress over time with intuitive charts and graphs. Watch as your 
                carbon footprint changes based on your lifestyle adjustments and celebrate your 
                accomplishments.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="mb-6">
            Climate change is a global challenge, but each of us can contribute to the solution. 
            By understanding and reducing your carbon footprint, you're taking an important step 
            toward a more sustainable future.
          </p>
          <p className="text-eco-primary font-bold">
            Start tracking today and be part of the change!
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
