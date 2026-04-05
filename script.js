let taskCount = 0;
let regularCount = 0;
let todayCount = 0;

// 🎉 show popup
function showCelebration(message) {
    let box = document.getElementById("celebration");
    box.style.display = "flex";
    box.querySelector("p").innerText = message;
}

// close popup
function closeCelebration() {
    document.getElementById("celebration").style.display = "none";
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskType = document.getElementById("taskType").value;
    let priority = document.getElementById("priority").value;

    let regularList = document.getElementById("regularList");
    let todayList = document.getElementById("todayList");

    if (taskInput.value === "") return;

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskPriority = priority;

    let span = document.createElement("span");
    span.innerText = taskInput.value + " (" + priority + ")";

    if (priority === "High") span.style.color = "#d63384";
    else if (priority === "Medium") span.style.color = "#e0a800";
    else span.style.color = "#28a745";

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.onclick = function() {
        if (editBtn.innerText === "Edit") {
            let input = document.createElement("input");
            input.value = span.innerText;
            li.replaceChild(input, span);
            editBtn.innerText = "Save";
        } else {
            let input = li.querySelector("input[type='text']");
            let newSpan = document.createElement("span");
            newSpan.innerText = input.value;
            li.replaceChild(newSpan, input);
            span = newSpan;
            editBtn.innerText = "Edit";
        }
    };

    checkbox.onclick = function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";

            if (taskPriority === "High") {
                showCelebration("You completed an important task 💪");
            }

        } else {
            span.style.textDecoration = "none";
        }

        let total = document.querySelectorAll("li span").length;
        let done = document.querySelectorAll("li input:checked").length;

        if (total > 0 && total === done) {
            showCelebration("All tasks done! Relax now 💖");
        }
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);

    if (taskType === "Regular") {
        regularList.appendChild(li);
        regularCount++;
    } else {
        todayList.appendChild(li);
        todayCount++;
    }

    taskInput.value = "";

    taskCount++;
    document.getElementById("totalTasks").innerText = "Total Tasks: " + taskCount;

    document.getElementById("breakdown").innerText =
        "Regular: " + regularCount + " | Today: " + todayCount;

    let message = "";

    if (taskCount > 8) message += "High workload! ";

    if (todayCount > regularCount)
        message += "Most workload comes from extra tasks today.";
    else if (regularCount > todayCount)
        message += "Daily routine tasks are taking most effort.";
    else
        message += "Workload is balanced.";

    document.getElementById("overloadMessage").innerText = message;
}