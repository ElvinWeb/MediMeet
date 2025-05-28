import Skeleton from "react-loading-skeleton";

const DoctorCardSkeleton = () => {
  return (
    <div className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white">
      <Skeleton height={220} baseColor="#F5F7FF" />
      <div className="p-4">
        <p className="mb-1">
          <Skeleton width={120} height={24} baseColor="#F5F7FF" />
        </p>
        <p className="mb-3">
          <Skeleton width={90} height={16} baseColor="#F5F7FF" />
        </p>
        <div className="my-2 flex items-center gap-1 text-sm">
          <Skeleton
            width={16}
            height={16}
            style={{ borderRadius: 4 }}
            baseColor="#F5F7FF"
          />
          <Skeleton width={60} height={16} baseColor="#F5F7FF" />
        </div>
        <div className="flex gap-2 mt-2">
          <Skeleton
            width={75}
            height={38}
            style={{ borderRadius: 8 }}
            baseColor="#F5F7FF"
          />
          <Skeleton
            width={75}
            height={38}
            style={{ borderRadius: 8 }}
            baseColor="#F5F7FF"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;
