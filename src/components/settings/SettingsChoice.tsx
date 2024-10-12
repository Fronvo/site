import { CheckIcon } from "@radix-ui/react-icons";

interface Props {
  selected: number;
  values: string[];
  clickListener: (i: number) => void;
}

export default function SettingsChoice({
  selected,
  values,
  clickListener,
}: Props) {
  return (
    <div className="flex flex-col">
      {values.map((title, i) => {
        return (
          <>
            <div
              onClick={() => clickListener(i)}
              className={`${
                selected === i ? "bg-border/25" : ""
              } hover:bg-border/25 duration-100 cursor-pointer rounded-md max-w-[350px] border-l-2 mt-2 mb-2 rounded-4 p-4 flex items-center`}
            >
              <h1 className="font-semibold tracking-wide mobile:text-[0.7rem] text-[0.9rem]">
                {title}
              </h1>

              <span className="flex-1" />

              {selected === i && (
                <>
                  <CheckIcon
                    className="mobile:w-[16px] mobile:h-[16px]"
                    width={20}
                    height={20}
                  />
                </>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}
