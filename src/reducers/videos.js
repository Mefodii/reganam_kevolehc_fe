const addPosterToVideo = (videos, poster) => {
  return videos.map((video) => {
    if (poster.video !== video.id) return video;

    return {
      ...video,
      images: [...video.images, poster],
    };
  });
};

const deletePosterFromVideo = (videos, videoId, posterId) => {
  return videos.map((video) => {
    if (videoId !== video.id) return video;

    return {
      ...video,
      images: video.images.filter((image) => image.id !== posterId),
    };
  });
};

export const addPoster = (groups, { poster, groupId }) => {
  return groups.map((group) => {
    if (groupId !== group.id) return group;

    return {
      ...group,
      videos: addPosterToVideo(group.videos, poster),
    };
  });
};

export const deletePoster = (groups, { videoId, posterId, groupId }) => {
  return groups.map((group) => {
    if (groupId !== group.id) return group;

    return {
      ...group,
      videos: deletePosterFromVideo(group.videos, videoId, posterId),
    };
  });
};

export const sortByOrder = (a, b) => a.order - b.order;
export const sortGroups = (groups) => [
  ...groups.map((group) => {
    group.videos.sort(sortByOrder);
    return group;
  }),
];
export const deleteGroup = (groups, groupId) => {};

export const addGroup = (groups, newGroup) => {};
