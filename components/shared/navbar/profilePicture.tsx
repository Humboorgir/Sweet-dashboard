import type { Session } from "next-auth";

import Image from "next/image";

const ProfilePicture = ({ session }: { session: Session }) => {
  // if the user has a profile picture:
  if (session.user.image)
    return (
      <Image
        className="rounded-full w-12 h-12"
        src={session.user.image}
        height={45}
        width={45}
        alt={session.user.name}
      />
    );

  // if not:
  return (
    <div
      className="rounded-full w-12 h-12 font-bold text-xl grid place-items-center bg-gradient-to-br
    from-primary to-violet-400">
      {session.user.name[0]}
    </div>
  );
};

export default ProfilePicture;
