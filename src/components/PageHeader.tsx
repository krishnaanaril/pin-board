function PageHeader({ headerText, children }: { headerText: string, children?: React.ReactNode }) {
    return (
        <header className="h-32 flex flex-col-reverse pl-4 pb-4 bg-yellow-300 dark:bg-neutral-700 dark:text-yellow-400">
            <div className="flex flex-row justify-between">
                <h1 className="text-4xl font-bold">{headerText}</h1>
                <div className="pr-4">
                    {children}
                </div>
            </div>
        </header>
    );
}

export default PageHeader;