function EmployeeCard({employee}){
    return(
        <>
            <div className="card">
                <img src={employee.img} alt={employee.name} />
                <h2>{employee.name}</h2>
                <p>{employee.position}</p>
            </div>
        </>
    )
}

export default EmployeeCard;