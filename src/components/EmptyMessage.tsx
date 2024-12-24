export function EmptyMessage({message} : {message: string}) {
    return (
        <div className="flex flex-col justify-center items-center p-4">
            <img className="size-48" src="/nodata.svg" alt="No data" />
            <p className="text-center font-bold my-2">{message}</p>
        </div>
    );
}