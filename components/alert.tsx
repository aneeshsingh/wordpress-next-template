import Container from "@/app/components/container";
import { EXAMPLE_PATH } from "@/app/lib/constants";

export default function Alert({ preview }) {
    return (
        <div
            className={`border-b ${preview ? "bg-accent-7 border-accent-7 text-white" : "bg-accent-1 border-accent-2"}`}
        >
            <Container>
                <div className="py-2 text-center text-sm">
                    {preview ? (
                        <>
                            This is a page preview.{" "}
                            <a
                                href="/src/app/api/exit-preview"
                                className="underline hover:text-cyan duration-200 transition-colors"
                            >
                                Click here
                            </a>{" "}
                            to exit preview mode.
                        </>
                    ) : (
                        <>
                            The source code for this blog is{" "}
                            <a
                                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                                className="underline hover:text-success duration-200 transition-colors"
                            >
                                available on GitHub
                            </a>
                            .
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
}
