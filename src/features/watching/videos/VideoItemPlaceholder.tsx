type VideoItemPlaceholderProps = React.PropsWithChildren & {
  show: boolean;
  className?: string;
};

const VideoItemPlaceholder: React.FC<VideoItemPlaceholderProps> = ({
  show,
  className,
}) => {
  if (!show) return <></>;

  return (
    <div
      className={`h-14 p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-5 ${className}`}
    ></div>
  );
};

export default VideoItemPlaceholder;
