import React from "react";
import { getInitials } from "../../utils/helper.js";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-medium bg-sky-100">
        {getInitials(userInfo)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
