const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUser(userData) {
    if (!VALID_EMAIL_REGEX.test(userData.email)) throw new Error("Invalid email");
    if (userData.age < 18) throw new Error("Must be adult");
    return true;
}

function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.toLowerCase(),
        name: userData.name.trim(),
    };
}

async function createUser(userData) {
    validateUser(userData);
    const normalizedUser = normalizeUser(userData);
    await database.save(normalizedUser);
    await emailService.sendWelcome(normalizedUser.email);
    return normalizedUser;
}