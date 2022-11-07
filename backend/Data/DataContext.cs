using System;
using dotnet_blog_api.Models;
using dotnet_blog_api.Services.PasswordHasher;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace dotnet_blog_api.Data
{
    public class DataContext : DbContext
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IConfiguration _configuration;
        public DataContext(DbContextOptions options, IPasswordHasher passwordHasher, IConfiguration configuration) : base(options)
        {
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var adminPassword = _configuration.GetSection("AppSettings:AdminPassword").Value;
            Console.WriteLine(adminPassword);
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@email.com",
                    Username = "admin",
                    PasswordHash = _passwordHasher.HashPassword(adminPassword),
                    Role = "Admin"
                }
            );
        }
    }
}