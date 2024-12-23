function PageHeader({ headerText, children }: { headerText: string, children?: React.ReactNode }) {
    return (
        <header className="h-32 flex flex-col-reverse pl-4 pb-2 bg-gray-100">
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