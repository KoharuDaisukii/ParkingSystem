package knuknu.parkingsystem.service;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import knuknu.parkingsystem.repository.HistoryRepository;
import knuknu.parkingsystem.repository.JdbcTemplateHistoryRepository;

@Configuration
public class SpringConfig {
	private final DataSource dataSource;
	
	@Autowired
	public SpringConfig(DataSource dataSource) {
		this.dataSource = dataSource;
	}
}
