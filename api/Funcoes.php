<?php
class Funcoes
{
    public static function insertDados($pdo, $especialidade)
    {
        $query = $pdo->prepare("
            INSERT INTO tb_especialidades
            (
                especialidade
            )
            VALUES
            (
                :especialidade
            )
        ");

        $query->bindParam(':especialidade', $especialidade);

        return $query->execute();
    }

    public static function getEspecialidadesAtivas($pdo)
    {
        $query = $pdo->query("
            SELECT
                id,
                especialidade
            FROM
                tb_especialidades
            WHERE TRUE
                AND ativo = 1
        ");

        $especialidades = $query->fetchAll(PDO::FETCH_ASSOC);

        return $especialidades;
    }

    public static function insertRestaurante($pdo, $razaoSocial, $cnpj, $nomeFantasia, $endereco, $uf, $cidade, $especialidade, $telefone)
    {
        $query = $pdo->prepare("
            INSERT INTO tb_restaurantes
            (
                razao_social,
                cnpj,
                nome_fantasia,
                endereco,
                uf,
                cidade,
                especialidade,
                telefone
            )
            VALUES
            (
                :razaoSocial,
                :cnpj,
                :nomeFantasia,
                :endereco,
                :uf,
                :cidade,
                :especialidade,
                :telefone
            )
        ");

        $query->bindParam(':razaoSocial', $razaoSocial);
        $query->bindParam(':cnpj', $cnpj);
        $query->bindParam(':nomeFantasia', $nomeFantasia);
        $query->bindParam(':endereco', $endereco);
        $query->bindParam(':uf', $uf);
        $query->bindParam(':cidade', $cidade);
        $query->bindParam(':especialidade', $especialidade);
        $query->bindParam(':telefone', $telefone);

        return $query->execute();
    }

    public static function getRestaurantes($pdo, $filtro)
    {
        if ($filtro != 'todos') {
            $criterioEspecilaidade = "AND especialidade = :filtro";
        } else {
            $criterioEspecilaidade = "";
        }

        $query = "
            SELECT
                *
            FROM
                tb_restaurantes
            WHERE TRUE
                AND ativo = 1
                {$criterioEspecilaidade}
        ";

        $stmt = $pdo->prepare($query);
        if ($filtro != 'todos') {
            $stmt->bindParam(':filtro', $filtro, PDO::PARAM_STR);
        }

        $stmt->execute();
        $restaurantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $restaurantes;
    }

    public static function exlcuiRestaurante($pdo, $id)
    {
        $update = $pdo->prepare("
            UPDATE
                tb_restaurantes
            SET
                ativo = 0
            WHERE TRUE
                AND id = :id
        ");

        $update->bindParam(':id', $id, PDO::PARAM_INT);

        return $update->execute();
    }
}
?>