import { SearchCode, Paintbrush, Code, TestTube, Rocket, Wrench } from "lucide-react";
import FlipIn from "../animations/flip-in";
import PopUp from "../animations/pop-up";

export default function WorkProcessSection() {
    const processSteps = [
        {
            title: "Discovery",
            description: "We begin by understanding your project requirements and goals.",
            icon: <SearchCode className="w-6 h-6" />
        },
        {
            title: "Design",
            description: "We create a design that aligns with your brand and meets your needs.",
            icon: <Paintbrush className="w-6 h-6" />
        },
        {
            title: "Development",
            description: "We build your project using the latest technologies and best practices.",
            icon: <Code className="w-6 h-6" />
        },
        {
            title: "Testing",
            description: "We ensure your project is free of bugs and meets your quality standards.",
            icon: <TestTube className="w-6 h-6" />
        },
        {
            title: "Launch",
            description: "We launch your project and provide ongoing support to ensure it runs smoothly.",
            icon: <Rocket className="w-6 h-6" />
        },
        {
            title: "Maintenance",
            description: "We provide ongoing support to ensure your project runs smoothly and meets your needs.",
            icon: <Wrench className="w-6 h-6" />
        }
    ];

    return (
        <section className="w-full min-h-[50vh] relative py-20 overflow-hidden">
            {/* Background pattern with animated gradient overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/pattern.svg')] opacity-15 2xl:opacity-60" />
            <div className="container mx-auto px-5 sm:px-10 relative z-10">
                <div className="overflow-hidden">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center px-5">
                        <PopUp delay={0.2}>
                            <h1 className="text-4xl md:text-5xl font-bold font-[Poppins] text-primary">
                                How We Work
                            </h1>
                        </PopUp>

                    </div>

                    {/* Work Process Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 p-6 sm:p-10">
                        {processSteps.map((step, index) => (
                            <FlipIn key={index} delay={0.1 + index * 0.1}>
                                <div

                                    className="group backdrop-blur-sm bg-primary/5 hover:bg-primary/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-900/30 rounded-lg group-hover:bg-green-500/50 transition-colors duration-300 flex items-center justify-center">
                                            <span className="text-white">
                                                {step.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-green-400">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <h2 className="text-xl font-bold font-[Poppins] text-primary">
                                                    {step.title}
                                                </h2>
                                            </div>
                                            <p className="mt-2 text-primary/80">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FlipIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}