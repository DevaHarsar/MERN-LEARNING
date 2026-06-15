import EmployeeCard from "./EmployeeCard";
function EmplployeeList(){
    const employees = [
        {
            id:1,
            name:"John Doe",
            position:"Software Engineer",
            img:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        },
        {
            id:2,
            name:"Jane Smith",
            position:"Product Manager",
            img:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        },
        {
            id:3,
            name:"Mike Johnson",
            position:"UX Designer",
            img:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        },
    ]
    return(
        <>
         <div className="employee-list">
            <h1>Employee List</h1>
            {employees.map((employee)=>(
                <EmployeeCard key={employee.id} employee={employee}/>
            ))}
         </div>
        </>
    )
}
export default EmplployeeList;