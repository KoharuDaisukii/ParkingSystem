package knuknu.parkingsystem.service;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

public class ImageUtil {
	private BufferedImage bufferedImage;

	public ImageUtil(MultipartFile multipartFile) throws IOException {
		this.bufferedImage = ImageIO.read(multipartFile.getInputStream());
	}

	public ImageUtil(File file) throws IOException {
		this.bufferedImage = ImageIO.read(file);
	}

	public ImageUtil(BufferedImage bufferedImage) {
		this.bufferedImage = bufferedImage;
	}

	public int getWidth() {
		return bufferedImage.getWidth();
	}

	public int getHeight() {
		return bufferedImage.getHeight();
	}

	public ImageUtil resize(int width, int height) {
		BufferedImage dest = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics2D = dest.createGraphics();
		graphics2D.setComposite(AlphaComposite.Src);
		graphics2D.drawImage(bufferedImage, 0, 0, width, height, null);
		graphics2D.dispose();
		return new ImageUtil(dest);
	}
	
	public ImageUtil resize(int width) {
		int resizedHeight = (width * bufferedImage.getHeight()) / bufferedImage.getWidth();
		return resize(width, resizedHeight);
	}

	public ImageUtil crop(int x, int y, int width, int height) {
		BufferedImage dest = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics2D = dest.createGraphics();
		graphics2D.setComposite(AlphaComposite.Src);
		graphics2D.drawImage(bufferedImage, 0, 0, width, height, x, y, x + width, y + height, null);
		graphics2D.dispose();
		return new ImageUtil(dest);
	}

	public void writeTo(OutputStream stream, String formatName) throws IOException {
		ImageIO.write(bufferedImage, formatName, stream);
	}
}
