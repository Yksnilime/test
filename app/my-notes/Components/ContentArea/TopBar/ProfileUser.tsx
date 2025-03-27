"use client";

function ProfileUser() {
  return (
    <div className="flex gap-3 items-center">
      <img
        src="https://via.placeholder.com/36"
        alt="User Profile"
        className="w-9 h-9 rounded-full mb-[5px]"
      />
      <div className="max-md:hidden flex flex-col text-sm">
        <span className="font-semibold">Demo User</span>
        <span className="text-slate-500 text-[11px]">demo@example.com</span>
      </div>
    </div>
  );
}

export default ProfileUser;
