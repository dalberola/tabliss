import React from "react";
import { useObjectUrl } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { getGif } from "./api";
import Credit from "./Credit";
import "./Giphy.sass";
import { defaultData, Props } from "./types";

const Giphy: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  const [gif, setGif] = React.useState(cache);
  const mounted = React.useRef(false);
  React.useEffect(() => {
    const config = { tag: data.tag, nsfw: data.nsfw };
    getGif(config, loader).then(setCache);
    if (mounted.current || !gif) getGif(config, loader).then(setGif);
    mounted.current = true;
    // Re-fetch only when the user-visible config changes; `gif`/`loader`/
    // `setCache` are read through closures (stable enough; loader is
    // recreated each render but inclusion would cause a fetch loop).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.tag, data.nsfw]);

  const url = useObjectUrl(gif && gif.data);

  if (!gif || !url) return null;

  return (
    <div className="Giphy fullscreen">
      <Backdrop
        className="gif fullscreen"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: data.expand ? "cover" : undefined,
        }}
      />
      <Credit link={gif.link} />
    </div>
  );
};

export default Giphy;
