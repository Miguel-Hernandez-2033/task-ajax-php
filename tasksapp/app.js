$(function() {
    console.log('JQuery is Working')
    let edit = false;
    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function(e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function(response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                        ${task.name}
                        </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }
    })

    $('#form-task').submit(function(e) {
        const postData = {
            id: $('#task-id').val(),
            name: $('#name').val(),
            description: $('#description').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post(url, postData, function(response) {
            $('#form-task').trigger('reset');
            edit = false;
            fetchTasks();
        });
        e.preventDefault();
    })

    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr task-id="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="item-task" >${task.name}</a
                            </td>    
                            <td>${task.description}</td>
                            <td>
                                <button class="delete-task btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>`
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click', '.delete-task', function() {
        if (confirm('Are you sure you want to deleted?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('task-id');
            $.post("task-delete.php", { id }, function(response) {
                fetchTasks();
            });
        }
    })

    $(document).on('click', '.item-task', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('task-id');
        $.post('task-single.php', { id }, function(response) {
            const task = JSON.parse(response);
            $('#task-id').val(task.id);
            $('#name').val(task.name);
            $('#description').val(task.description);
            edit = true;
        });
    })

});