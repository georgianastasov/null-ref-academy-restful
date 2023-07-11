using System.Text;
using System.Security.Cryptography;

namespace NullRefAcademy.Cryptography
{
    public class Crypting
    {
        public static string Crypt(string decryptedPassword)
        {
            string hash = "@Password2022";
            byte[] fromData = Encoding.UTF8.GetBytes(decryptedPassword);

            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider();

            tripDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
            tripDES.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripDES.CreateEncryptor();
            byte[] result = transform.TransformFinalBlock(fromData, 0, fromData.Length);

            return Convert.ToBase64String(result);
        }

        public static string DeCrypt(string crypted)
        {
            string hash = "@Password2022";
            byte[] data = Convert.FromBase64String(crypted);

            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider();

            tripDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
            tripDES.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripDES.CreateDecryptor();
            byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

            return UTF8Encoding.UTF8.GetString(result);
        }
    }
}
