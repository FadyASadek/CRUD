using System.Text;
using Api.data;
using Api.model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controller
{

    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private dbContext _context;

        public StudentController(dbContext context)
        {
            this._context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }
        [HttpPost]
        public async Task<IActionResult> AddSudent(student std)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.AddAsync(std);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet("id:int")]
        public async Task<ActionResult<student>> GetStudentById(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student is null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [HttpDelete("id:int")]
        public async Task<IActionResult> deleteStudent(int id)
        {
            var studentDeleted = await _context.Students.FindAsync(id);
            if (studentDeleted is null)
            {
                return NotFound();
            }
            _context.Remove(studentDeleted);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("id:int")]
        public async Task<IActionResult> EditStudent(int id, student editStudent)
        {
            var Studentdb = await _context.Students.FindAsync(id);
            if (Studentdb is null)
            {
                return NotFound();
            }
            Studentdb.name = editStudent.name;
            Studentdb.Address = editStudent.Address;
            Studentdb.Email = editStudent.Email;
            Studentdb.PhoneNumber = editStudent.PhoneNumber;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}