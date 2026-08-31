
export const addUserTokenUsage = async (user, totalTokens) => {
  user.usage.totalTokenUsed += totalTokens;
  await user.save();
};