import Image from "next/image";

export function Loader() {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="loading"
        height={50}
        width={50}
      />
    </div>
  );
}
