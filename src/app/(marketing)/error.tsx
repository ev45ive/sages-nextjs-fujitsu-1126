"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // return .grid.justify-center.items-center.min-h-svh>h1.text-4xl{Loading...}
  return (
    <div className="grid justify-center items-center min-h-full my-10 text-center">
      <h1 className="text-4xl">Error!</h1>

      <p className="mt-5 text-red-800">{error.digest}</p>
      <p className=" text-red-500">{error instanceof Error && error.message}</p>

      <button
        className="bg-red-500"
        onClick={() => {
          reset();
        }}
      >
        Reload
      </button>
    </div>
  );
}
