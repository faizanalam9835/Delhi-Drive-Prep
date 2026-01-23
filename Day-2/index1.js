const employees = [
    { id: 1, name: "Alice", department: "Engineering", salary: 120000, experience: 5, rating: 4.8 },
    { id: 2, name: "Bob", department: "Engineering", salary: 95000, experience: 2, rating: 3.9 },
    { id: 3, name: "Charlie", department: "Sales", salary: 80000, experience: 4, rating: 4.5 },
    { id: 4, name: "Diana", department: "HR", salary: 70000, experience: 1, rating: 3.2 },
    { id: 5, name: "Evan", department: "Engineering", salary: 135000, experience: 7, rating: 4.9 },
    { id: 6, name: "Fiona", department: "Marketing", salary: 90000, experience: 3, rating: 4.1 },
    { id: 7, name: "George", department: "Sales", salary: 65000, experience: 1, rating: 3.5 },
    { id: 8, name: "Hannah", department: "Engineering", salary: 110000, experience: 4, rating: 4.6 },
    { id: 9, name: "Ian", department: "Marketing", salary: 105000, experience: 6, rating: 4.7 },
    { id: 10, name: "Jenny", department: "HR", salary: 72000, experience: 3, rating: 3.8 },
    { id: 11, name: "Kevin", department: "Sales", salary: 125000, experience: 8, rating: 4.2 },
    { id: 12, name: "Liam", department: "Engineering", salary: 98000, experience: 3, rating: 4.0 },
    { id: 13, name: "Mia", department: "Design", salary: 85000, experience: 2, rating: 4.3 },
    { id: 14, name: "Noah", department: "Design", salary: 115000, experience: 9, rating: 4.8 },
    { id: 15, name: "Olivia", department: "Marketing", salary: 78000, experience: 2, rating: 3.9 }
  ];

  //Q1 .
  const Filtered = employees.filter((ele)=>{
       return ele.rating >= 4.5
  })
  
  const Map1 = Filtered.map((ele) =>{
       return ele.name
  })

  console.log(Map1)

//Q2 .
  const FilterDepartment =  employees.filter((ele) =>{
        return ele.department === "Engineering"
  })
  
  const TotalAnnual = FilterDepartment.reduce((acc,curr) =>{
        return acc += curr.salary
  },0)

  console.log(TotalAnnual)


// Q3.
 
const sorting = employees.sort((a,b) =>{
     if(b.experience === a.experience){
        return b.salary - a.salary
     }else{
         return b.experience - a.experience
     }
    
})


console.log(sorting)

// Q4 .

const reducer = employees.reduce((acc,curr) =>{
    if(acc[curr.department]){
        acc[curr.department]++
    }else{
        acc[curr.department] = 1
    }
 return acc
} , {})

console.log(reducer)


//Q5.
const reducerlength = employees.reduce((acc,curr) =>{
        if(acc[curr.department]){
            acc[curr.department]++
        }else{
            acc[curr.department] = 1
        }
     return acc
} , {})


const reduceradd = employees.reduce((acc,curr) =>{
    if(acc[curr.department]){
        acc[curr.department] += curr.salary
    }else{
        acc[curr.department] = curr.salary
    }
 return acc
} , {})




const merge = Object.keys(reducerlength)

const res1 = merge.reduce((acc, curr) => {
    const avg = Math.floor(reduceradd[curr] / reducerlength[curr])
    acc[curr] = avg
    return acc
  }, {})
  console.log(res1)












