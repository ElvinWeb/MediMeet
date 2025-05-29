import Skeleton from "react-loading-skeleton";

const AppointmentCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b bg-white">
      <div>
        <Skeleton
          width={144}
          height={144}
          baseColor="#F5F7FF"
          style={{ borderRadius: 12 }}
        />
      </div>
      <div className="flex-1 text-sm text-[#5E5E5E]">
        <p className="mb-1">
          <Skeleton width={115} height={20} baseColor="#F5F7FF" />
        </p>
        <p className="mb-1">
          <Skeleton width={90} height={16} baseColor="#F5F7FF" />
        </p>
        <p className="text-[#464646] font-medium mt-1">
          <Skeleton width={60} height={15} baseColor="#F5F7FF" />
        </p>
        <p>
          <Skeleton width={100} height={14} baseColor="#F5F7FF" />
        </p>
        <p>
          <Skeleton width={90} height={14} baseColor="#F5F7FF" />
        </p>
        <p className="mt-1">
          <Skeleton width={200} height={16} baseColor="#F5F7FF" />
        </p>
      </div>
      <div></div>
      <div className="flex flex-col gap-2 justify-end text-sm text-center">
        <Skeleton
          width={180}
          height={35}
          baseColor="#F5F7FF"
          style={{ borderRadius: 8 }}
        />
        <Skeleton
          width={180}
          height={35}
          baseColor="#F5F7FF"
          style={{ borderRadius: 8 }}
        />
      </div>
    </div>
  );
};

export default AppointmentCardSkeleton;
