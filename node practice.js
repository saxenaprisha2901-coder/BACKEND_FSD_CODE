console.log("\n========== 1. PROMISE BASIC ==========");

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched successfully");
        }, 2000);
    });
}

fetchData().then((result) => {
    console.log(result);
});



console.log("\n========== 2. PROMISE RESOLVE / REJECT ==========");

function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve("Eligible");
        } else {
            reject("Not Eligible");
        }
    });
}

checkAge(20)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// ============================================================
// 3. PROMISE CHAINING
// ============================================================

console.log("\n========== 3. PROMISE CHAINING ==========");

function loginUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User logged in");
            resolve("user123");
        }, 1000);
    });
}

function getUserDetails(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User details fetched for:", userId);
            resolve("User Details");
        }, 1000);
    });
}

function getUserOrders(details) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Orders fetched for:", details);
            resolve("User Orders");
        }, 1000);
    });
}

loginUser()
    .then((userId) => {
        return getUserDetails(userId);
    })
    .then((details) => {
        return getUserOrders(details);
    })
    .then((orders) => {
        console.log("Final Result:", orders);
    })
    .catch((error) => {
        console.log("Error:", error);
    });



console.log("\n========== 4. PROMISE.ALL() ==========");

const usersPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Users fetched");
    }, 3000);
});

const productsPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Products fetched");
    }, 2000);
});

const ordersPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Orders fetched");
    }, 1000);
});

Promise.all([
    usersPromise,
    productsPromise,
    ordersPromise
])
.then((results) => {
    console.log("All Promises completed:");
    console.log(results);
})
.catch((error) => {
    console.log("Error:", error);
});


console.log("\n========== 5. ASYNC / AWAIT ==========");

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

async function displayData() {
    const result = await getData();
    console.log(result);
}

displayData();



console.log("\n========== 6. ASYNC/AWAIT ERROR HANDLING ==========");

function fetchErrorData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Unable to fetch data");
        }, 1000);
    });
}

async function handleError() {
    try {
        const result = await fetchErrorData();
        console.log(result);
    } catch (error) {
        console.log("Error:", error);
    }
}

handleError();



console.log("\n========== 7. SEQUENTIAL ASYNC OPERATIONS ==========");

async function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data");
        }, 1000);
    });
}

async function getProfile() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Profile data");
        }, 1000);
    });
}

async function getPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Posts data");
        }, 1000);
    });
}

async function getAllData() {
    const user = await getUser();
    console.log(user);

    const profile = await getProfile();
    console.log(profile);

    const posts = await getPosts();
    console.log(posts);

    console.log("All sequential operations completed");
}

getAllData();


// ============================================================
// 8. EVENT LOOP – PREDICT OUTPUT
// ============================================================

console.log("\n========== 8. EVENT LOOP ==========");

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");


console.log("\n========== 10. ASYNC/AWAIT + EVENT LOOP ==========");

console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

async function test() {
    console.log("3");

    await Promise.resolve();

    console.log("4");
}

test();

Promise.resolve().then(() => {
    console.log("5");
});

console.log("6");

// Output:
// 1
// 3
// 6
// 4
// 5
// 2


// ============================================================
// 11. CHALLENGE – ASYNC/AWAIT + PROMISE + EVENT LOOP
// ============================================================

console.log("\n========== 11. CHALLENGE ==========");

console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");

    setTimeout(() => {
        console.log("Timeout 2");
    }, 0);
});

async function demo() {
    console.log("Async 1");

    await Promise.resolve();

    console.log("Async 2");
}

demo();

console.log("End");
