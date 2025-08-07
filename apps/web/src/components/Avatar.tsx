import { User2Icon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import AuthButton from './buttons/LoginButton';

const UserAvatar = () => {
  const { isPending, data } = authClient.useSession();
  if (isPending || !data?.user) {
    return <AuthButton />;
  }

  if (!data?.user.image) {
    return (
      <Avatar className="rounded-full">
        <AvatarFallback className="rounded-full bg-indigo-500 text-white">
          <User2Icon />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage alt={data?.user.username!} src={data?.user.image} />
        <AvatarFallback className="uppercase">
          {data?.user.displayUsername?.split(' ').slice(0, 2).join(' ')}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold tracking-tight">shadcn</span>
        <span className="text-muted-foreground text-sm leading-none">
          Shadcn UI
        </span>
      </div>
    </div>
  );
};

export default UserAvatar;
