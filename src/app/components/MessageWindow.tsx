import { auth } from "@clerk/nextjs/server";

const MessageWindow = async () => {
    const LinkWithMessage: React.FC = () => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); 
      const message = "Toto je vaše zpráva z href!";
      
    };
  }
  const userId = await auth();
  return <div className="">MessageWindow</div>;
};

export default MessageWindow;