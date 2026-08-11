export const resetUsageIfNeeded = async (user) => {
  const now = new Date();

  if (now > user.usage.resetAt) {
    user.usage.tokenUsed = 0;
    user.usage.resetAt = new Date(Date.now() + 5 * 60 * 60 * 1000);
    await user.save();
  }
};

export const hasTokenLimitReached = (user) => {
  return user.usage.tokenUsed >= user.usage.tokenLimit;
};

export const addUserTokenUsage = async (user, totalTokens) => {
  user.usage.tokenUsed += totalTokens;
  user.usage.totalTokenUsed += totalTokens;

  await user.save();
};