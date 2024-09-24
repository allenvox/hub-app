// Fetch groups and populate UI
async function fetchGroups() {
    const response = await fetch('/groups');
    const groups = await response.json();
    const groupsDiv = document.getElementById('groups');
    groupsDiv.innerHTML = '';

    groups.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.innerHTML = `
            <h2 style="cursor: pointer;" onclick="fetchSchedule(${group.id})">${group.name} (Year ${group.courseYear})</h2>
        `;
        groupsDiv.appendChild(groupElement);
    });
}

// Fetch schedule for a specific group
async function fetchSchedule(groupId) {
    const response = await fetch(`/schedule?groupId=${groupId}`);
    
    if (!response.ok) {
        console.error('Failed to fetch schedule:', response.statusText);
        return;
    }

    const schedules = await response.json();
    const groupScheduleDiv = document.getElementById('groupSchedule');
    groupScheduleDiv.innerHTML = ''; // Clear previous schedules

    if (schedules.length === 0) {
        groupScheduleDiv.innerHTML = `<p>No schedules found for this group.</p>`;
        return;
    }

    schedules.forEach(schedule => {
        const scheduleItem = document.createElement('div');
        scheduleItem.innerHTML = `
            <h4>${schedule.subject} - ${schedule.lecturer}</h4>
            <p>${schedule.day} | ${schedule.startTime} - ${schedule.endTime} | Room: ${schedule.room}</p>
        `;
        groupScheduleDiv.appendChild(scheduleItem);
    });
}

// Initialize the page by fetching groups
fetchGroups();
