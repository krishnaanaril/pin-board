function PageHeader({ headerText }: { headerText: string }) {
    return (
        <header className="h-32 flex flex-col-reverse pl-4 pb-2 bg-gray-100">
            <h1 className="text-4xl font-bold">{headerText}</h1>
        </header>
    );
}

export default PageHeader;