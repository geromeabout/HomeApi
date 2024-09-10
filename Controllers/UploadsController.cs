
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace HomeApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class UploadsController : ControllerBase
{
    public UploadsController()
    {

    }
    [HttpPost, DisableRequestSizeLimit]
    public IActionResult Upload()
    {
        try
        {
            var file = Request.Form.Files[0];
            //var folderName = Path.Combine("Resources", "Uploads");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/uploads");
            if (file.Length > 0)
            {
                
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var uniquefileName = Guid.NewGuid().ToString() +"_"+fileName;
                var fullPath = Path.Combine(pathToSave, uniquefileName);
                //var dbPath = Path.Combine(folderName, uniquefileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return Ok(uniquefileName);
            }
            else
            {
                return BadRequest();
            } 
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}