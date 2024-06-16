interface Container {
  title: string;
  description: string;
  icon: string;
}

export default function Containers() {
  const containers: Container[] = [
    {
      title: "Tiny cloud-based storage",
      description:
        "Ever needed an easy-to-setup, tiny file storage? This one's for you.",
      icon: "tiny",
    },
    {
      title: "No fees or advertising",
      description: "Get away from Google Drive and iCloud fees and tracking.",
      icon: "free",
    },
    {
      title: "Lite performance",
      description: "No more waiting around. Get the job done.",
      icon: "speed",
    },
  ];
  return (
    <div id="features">
      {containers.map(({ title, description, icon }) => {
        return (
          <div
            key={title}
            className="mobile:flex-col mobile:p-0 mobile:pr-0 mobile:w-full pl-[10vw] pr-[10vw] w-screen h-[75vh] flex items-center justify-center"
          >
            <div className="mobile:mb-10 mobile:w-full w-[50%] flex flex-col items-center justify-center text-center">
              <h1 className="xs:text-2xl font-black tracking-tight text-4xl">
                {title}
              </h1>
              <h1 className="xs:text-sm font-normal tracking-normal text-md">
                {description}
              </h1>
            </div>

            <img
              src={`homepage/containers/${icon}.svg`}
              className="mobile:w-[80%] w-[50%]"
              alt={`${title} image`}
            />
          </div>
        );
      })}
    </div>
  );
}
