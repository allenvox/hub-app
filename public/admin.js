// DOM elements
const groupList = document.getElementById('groupList');
const scheduleList = document.getElementById('scheduleList');
const groupSelect = document.getElementById('groupSelect');
const addGroupForm = document.getElementById('addGroupForm');
const addScheduleForm = document.getElementById('addScheduleForm');

// Fetch groups and populate UI
async function fetchGroups() {
    const response = await fetch('/groups');
    const groups = await response.json();
    groupList.innerHTML = '';
    groupSelect.innerHTML = '<option value="" disabled selected>Select Group</option>';
    groups.forEach(group => {
        // Append group to group list
        const groupItem = document.createElement('div');
        groupItem.innerHTML = `
            <div>
                <h4>${group.name} (Year ${group.courseYear})</h4>
                <button onclick="deleteGroup(${group.id})">Delete</button>
            </div>
        `;
        groupList.appendChild(groupItem);

        // Append group to select dropdown in schedule form
        const option = document.createElement('option');
        option.value = group.id;
        option.text = group.name;
        groupSelect.appendChild(option);
    });
}

// Fetch schedules and populate UI
async function fetchSchedules() {
    try {
        const response = await fetch('/schedule'); // This should match your backend route
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const schedules = await response.json();
        scheduleList.innerHTML = '';
        schedules.forEach(schedule => {
            const scheduleItem = document.createElement('div');
            scheduleItem.innerHTML = `
                <div>
                    <h4>${schedule.subject} - ${schedule.lecturer} (${schedule.day}, ${schedule.startTime} - ${schedule.endTime})</h4>
                    <p>Group ID: ${schedule.GroupId} | Room: ${schedule.room}</p>
                    <button onclick="deleteSchedule(${schedule.id})">Delete</button>
                </div>
            `;
            scheduleList.appendChild(scheduleItem);
        });
    } catch (error) {
        console.error('Failed to fetch schedules:', error);
    }
}

// Add new group
addGroupForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    const name = document.getElementById('groupName').value;
    const courseYear = document.getElementById('courseYear').value;

    const response = await fetch('/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, courseYear }),
    });

    if (response.ok) {
        fetchGroups();  // Refresh group list
    }
});

// Add new schedule
addScheduleForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent default form submission

    const groupId = document.getElementById('groupSelect').value;
    const subject = document.getElementById('subject').value;
    const lecturer = document.getElementById('lecturer').value;
    const day = document.getElementById('day').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const room = document.getElementById('room').value;

    console.log("Form data:", { groupId, subject, lecturer, day, startTime, endTime, room });  // Log form data

    // Ensure all required fields are filled
    if (!groupId || !subject || !lecturer || !day || !startTime || !endTime || !room) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId,
                subject,
                lecturer,
                day,
                startTime,
                endTime,
                room
            }),
        });

        // Check if response is ok and handle JSON correctly
        if (!response.ok) {
            console.error("Failed to add schedule. Server responded with status:", response.status);
            alert("Error adding schedule. Please try again.");
            return;
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const responseData = await response.json();
            console.log("Server response:", responseData);
        } else {
            console.log("Server returned a non-JSON response");
        }

        alert("Schedule added successfully!");
        fetchSchedules();  // Refresh schedule list
    } catch (error) {
        console.error("Error during the API request:", error);
        alert("Error adding schedule. Please check the console for details.");
    }
});

// Delete group
async function deleteGroup(groupId) {
    const response = await fetch(`/groups/${groupId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchGroups();  // Refresh group list
    }
}

// Delete schedule
async function deleteSchedule(scheduleId) {
    const response = await fetch(`/schedule/${scheduleId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchSchedules();  // Refresh schedule list
    }
}

// Initialize the page by fetching groups and schedules
fetchGroups();
fetchSchedules();
