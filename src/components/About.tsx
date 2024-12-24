import { useEffect } from "react";
import PageHeader from "./PageHeader";

function About() {

    useEffect(() => {
        document.title = "About | Pin Board: Save your locations"
    }, []);

    return (
        <>
            <div className="block h-full">
                <PageHeader headerText="About" />
                <article>
                    <section className="px-4 py-2">
                        <p className="mt-4">
                            This app allows users to save locations and lists independently of major map services like Google, Bing, or Apple Maps. Users can easily share locations with other map applications. The app leverages OpenStreetMaps and ensures user privacy by storing all data locally in the browser, without any server-side storage.
                        </p>
                    </section>
                    <section className="px-4 py-2">
                        <h2 className="text-2xl font-bold">Features</h2>
                        <ul className="list-disc list-inside mt-4">
                            <li>Save locations with a name and note</li>
                            <li>Save lists with a name and description</li>
                            <li>View saved locations and lists</li>
                            <li>Edit saved locations and lists</li>
                            <li>Delete saved locations and lists</li>
                            <li>Export data as json</li>
                            <li>Import data from json</li>
                        </ul>
                    </section>
                    <section className="px-4 py-2">
                        <h2 className="text-2xl font-bold">Technologies</h2>
                        <ul className="list-disc list-inside mt-4">
                            <li>React</li>
                            <li>TypeScript</li>
                            <li>Zustand</li>
                            <li>React Hook Form</li>
                            <li>Tailwind CSS</li>
                            <li>Shadcn</li>
                        </ul>
                    </section>
                </article>
            </div>
        </>
    )
}

export default About;