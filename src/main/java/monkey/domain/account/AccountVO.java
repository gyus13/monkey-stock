package monkey.domain.account;

import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class AccountVO {
    private String userId;
    private Long competitionId;
    private Long points;
    private Long capital;

    public AccountVO(Account account) {
        this.userId = account.getId().getUserId();
        this.competitionId = account.getId().getCompetitionId();
        this.points = account.getPoints();
        this.capital = ObjectUtils.isEmpty(account.getHoldingStocks()) ? 0L : account.getTotalCapital();
    }

    public static List<AccountVO> transformList(List<Account> accountList) {
        return accountList.stream().map(account -> new AccountVO(account)).collect(Collectors.toList());
    }
}
