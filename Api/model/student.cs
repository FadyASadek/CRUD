using System.ComponentModel.DataAnnotations;

namespace Api.model
{
    public class student
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }= string.Empty;

    }
}