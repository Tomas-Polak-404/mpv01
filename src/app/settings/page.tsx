import LeftMenu from "../components/leftMenu/LeftMenu";
import InteractiveSection from "../components/InteractiveSection"; // klientská komponenta

const SettingsPage = () => {
  return (
    <div className="flex gap-6 pt-6 justify-center text-white h-[100vh]">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="profile" />
      </div>
      <div className="border-[1px] border-gray-600 flex text-white h-[90%] w-[40%] rounded-md ml-[2%] ">
        <div className="bg-black h-full w-[40%] rounded-md flex flex-col gap-3 p-2">
          <span className="text-2xl mt-2 p-2">Settings</span>
          {/* Interaktivní tlačítka jsou nyní v klientské komponentě */}
          <InteractiveSection />
        </div>
        <div className="w-[60%] hover:w-[180%]  transition-all duration-400 ease-in-out rounded-md relative  border-gray-600 border-[1px] bg-black">
          <div
            id="privacy"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Privacy Settings</h2>
          </div>
          <div
            id="account"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Account Settings</h2>
          </div>
          <div
            id="security"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Security Settings</h2>
          </div>

          <div
            id="access"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Accessibility Settings</h2>
          </div>
          <div
            id="posts"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Posts Settings</h2>
          </div>
          <div
            id="activity"
            className="hidden p-4"
          >
            <h2 className="text-xl mb-4">Activity Settings</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
