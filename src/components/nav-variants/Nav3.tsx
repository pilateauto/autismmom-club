import AnimatedNavigationTabs from "@/components/ui/animated-navigation-tabs";
export default function Nav3() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-8">
      <AnimatedNavigationTabs items={[{id:1,tile:"Recipes"},{id:2,tile:"Routines"},{id:3,tile:"Sensory"},{id:4,tile:"Communication"},{id:5,tile:"Reviews"},{id:6,tile:"School"},{id:7,tile:"Wall"}]} />
    </div>
  );
}
